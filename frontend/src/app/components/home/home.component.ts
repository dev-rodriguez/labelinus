import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { email } from 'src/app/interfaces/email';
import { EmailService } from 'src/app/services/email/email.service';
import { ValidatorService } from 'src/app/services/validators/validator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  public miFormulario: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    }
  );

  constructor( private fb: FormBuilder, private validatorService: ValidatorService, private emailService: EmailService ) { }

  ngOnInit(): void {
  }

  guardar(){
    if (this.miFormulario.invalid) {
    } else {
      const formValue: email = { ...this.miFormulario.value };
      this.emailService.sendContactEmail(formValue)
      .subscribe((response) =>{
        Swal.fire({
          icon: 'success',
          title: 'Email enviado correctamente',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        //limpia formulario sin errores
        this.formDirective.resetForm();
      },
      (error) =>{
        console.log("error", error)
        Swal.fire({
          icon: 'error',
          title: 'Email enviado correctamente',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      })
    }
  }

  //Valida si el texto es de un máximo de 500 carácteres.
  maxCaracteresErrorMsg(campo: string, name: string): string {
    const errors = this.miFormulario.get(campo)?.errors;
    if (errors?.required) {
      return `${name} is required`;
    } else if (errors?.maxlength) {
      return 'The entered value must be a maximum of 500 characters';
    }
    return '';
  }

  //mensajes de los errores del email
  emailErrorMsg() : string {
    const errors = this.miFormulario.get('email')?.errors
    if (errors?.required) {
      return 'Email es required'
    } else if (errors?.pattern ) {
      return "The value entered doesn't have an email format"
    } 
    return ''
  } 

  //Valida si el campo tuvo un error o si fue presionado
  campoNoValido(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

}
