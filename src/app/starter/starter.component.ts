import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoClienteModel } from '../models/TipoCliente.model';
import { ClienteModel } from '../models/Cliente.model';
import { NgForm } from '@angular/forms';
import { TipoClienteService } from '../services/tipo-cliente.service';
import { ClienteService } from '../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';
import { LoginService } from '../services/login.service';
import { UsuarioModel } from '../models/Usuario.modelo';

@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {

  g_indicador: string;
  lst_tipoCliente: TipoClienteModel[] =  [];
  lst_cliente: ClienteModel[] =  [];
  cliente: ClienteModel = new ClienteModel();
  tipoCliente: TipoClienteModel = new TipoClienteModel();
  closeResult: string;
  title_Modal: string;
  modal: NgbModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal, private modalService2: NgbModal,
    private tipoClienteService: TipoClienteService, private clienteService: ClienteService,
    private loginService: LoginService,
    private toastr: ToastrService) {
  }
  buscarClientes() {
    let tipoClienteId: any = this.tipoCliente.id;
    if (typeof tipoClienteId === 'undefined') {
      return;
    }
    if ( tipoClienteId === '' ){
      this.clienteService.getTodosClientes().subscribe(
        resp => {
          this.lst_cliente = resp;
          this.dtTrigger.next();
      });
    } else {
      tipoClienteId= parseInt(tipoClienteId.toString());
      this.clienteService.getTodosClientesbyTipoClienteId(tipoClienteId).subscribe(
        resp => {
          this.lst_cliente = resp;
          this.dtTrigger.next();
      });
    }
  }
  buscarClientesExcel() {
    let tipoClienteId: any = this.tipoCliente.id;
    if (typeof tipoClienteId === 'undefined') {
      return;
    }
    if ( tipoClienteId === '' ){
      this.clienteService.getTodosClientesdExcel().subscribe(
        resp => {
          const contentDispositionHeader: string = resp.headers.get('content-disposition');
          let filename: string;
          if (contentDispositionHeader && contentDispositionHeader.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDispositionHeader);
                if (matches != null && matches[1]) {
                  filename = matches[1].replace(/['"]/g, '');
                }
          }
          saveAs(resp.body, filename,
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      });
    } else {
      tipoClienteId= parseInt(tipoClienteId.toString());
      this.clienteService.getTodosClientesbyTipoClienteIdExcel(tipoClienteId).subscribe(
        resp => {
          const contentDispositionHeader: string = resp.headers.get('content-disposition');
          let filename: string;
          if (contentDispositionHeader && contentDispositionHeader.indexOf('attachment') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDispositionHeader);
                if (matches != null && matches[1]) {
                  filename = matches[1].replace(/['"]/g, '');
                }
          }
          saveAs(resp.body, filename,
          { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      });
    }
  }
  guardarCliente(formulario: NgForm) {
    if (formulario.invalid) {
      console.log('formulaio invalido');
      return;
    }
     this.cliente.tipoClienteId= parseInt(this.cliente.tipoClienteId.toString());
     if (this.g_indicador == 'I'){
      this.clienteService.createCliente(this.cliente).subscribe(respC => {
        this.toastr.success('Se guardo el registro', 'Aviso');
        this.modal.close();
        this.clienteService.getTodosClientes().subscribe(
          resp => {
            this.lst_cliente = resp;
            this.dtTrigger.next();
          });
       });
     } else if (this.g_indicador == 'M'){
      this.clienteService.updateCliente(this.cliente.id,this.cliente).subscribe(respC => {
        this.toastr.success('Se actualizo el registro', 'Aviso');
        this.modal.close();
        this.clienteService.getTodosClientes().subscribe(
          resp => {
            this.lst_cliente = resp;
            this.dtTrigger.next();
          });
       });
     }
  }

  agregarCliente(content) {
    this.g_indicador = 'I';
    this.cliente = new ClienteModel();
    this.title_Modal = 'Agregar Cliente';
    this.openModal(content);
  }
  modificarCliente(id: number, content){
    this.g_indicador = 'M';
    this.title_Modal = 'Modificar Cliente';
    this.clienteService.getClienteId(id).subscribe(
      (resp: ClienteModel) => {
        this.cliente = resp;
        this.openModal(content);
      });
  }
  eliminarCliente(id: number) {
    if (confirm('¿Desea eliminar este registro?')) {
      this.clienteService.deleteCliente(id).subscribe(
        (respdel: any) => {
          this.toastr.success('Se elimino el registro', 'Aviso');
           this.clienteService.getTodosClientes().subscribe(
            resp => {
              this.lst_cliente = resp;
              this.dtTrigger.next();
            });
        });
    }
  }
  openModal(content) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openModalConfirm(content) {
    this.modalService2.open(content, { size: 'sm' });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngAfterViewInit() {
    const usuario: UsuarioModel = new UsuarioModel();
    usuario.email = 'admin@admin.com';
    usuario.password = 'mZq4t7w!z%C*F-J';
    this.loginService.login(usuario).subscribe(
      respLog => {       
        this.tipoClienteService.getTodosTiposClientes().subscribe(
          resp => this.lst_tipoCliente = resp);
        this.clienteService.getTodosClientes().subscribe(
          resp => {
            this.lst_cliente = resp;
            this.dtTrigger.next();
          });
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 7,
            deferRender: true,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
            retrieve: true
          };
      }
    );

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
