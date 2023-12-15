export class Form {
  constructor(
    formContainer,
    form,
    nameField,
    phoneField,
    emailField,
    asuntField,
    messageField,
    formName,
    formPhone,
    formAsunt,
    formEmail,
    formMessage
  ) {
    this.formContainer = formContainer;
    this.form = form;
    this.nameField = nameField;
    this.phoneField = phoneField;
    this.emailField = emailField;
    this.asuntField = asuntField;
    this.messageField = messageField;
    this.formName = formName;
    this.formPhone = formPhone;
    this.formAsunt = formAsunt;
    this.formEmail = formEmail;
    this.formMessage = formMessage;
  }
  resetInput = (input) => {
    const formField = input;
    formField.style.borderColor = "#ffff";
    formField.value = "";
  };
  deleteMessageError(childs) {
    const childrens = childs;
    for (let i = 0; i < childrens.length; i++) {
      if (childrens[i].classList.contains("msg--error")) {
        childrens[i].remove();
      }
    }
  }
  createTemplateError(msg) {
    const error = document.createElement("div");
    error.classList.add("msg--error");
    error.innerHTML = `<p>${msg} </p>`;

    return error;
  }
  showSuccesForm(input) {
    const formField = input;
    const parentField = input.parentNode;
    this.deleteMessageError(parentField.children);
    formField.style.borderColor = "#90ff7d";
  }
  showErrorForm(input, container, msg) {
    const formField = input;
    const parentField = input.parentNode;
    this.deleteMessageError(parentField.children);
    formField.style.borderColor = "#ff7d7d";
    const error = this.createTemplateError(msg);
    container.appendChild(error);
    return;
  }
  isEmpty = (input) => {
    return !input.value.trim().length;
  };
  isBetween = (input, min, max) => {
    return input.value.length >= min && input.value.length <= max;
  };
  isEmailValid = (input) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return re.test(input.value.trim());
  };
  anyNumber = (input) => {
    const re = /\d/;
    return re.test(input.value.trim());
  };
  isPhoneValid = (input) => {
    const re = /^[0-9]{10}$/;

    return re.test(input.value.trim());
  };
  checkName = (input) => {
    const min = 3;
    const max = 35;
    let valid = false;
    if (this.isEmpty(input)) {
      this.showErrorForm(input, this.nameField, "completa este campo");
      return;
    } else if (!this.isBetween(input, min, max)) {
      this.showErrorForm(
        input,
        this.nameField,
        `debe tener entre ${min} y ${max} caracteres`
      );
      return;
    } else if (this.anyNumber(input)) {
      this.showErrorForm(input, this.nameField, `no puedes agregar numeros`);
      return;
    }
    this.showSuccesForm(input);
    valid = true;
    return valid;
  };
  checkAsunt = (input) => {
    const min = 3;
    const max = 40;
    let valid = false;
    if (this.isEmpty(input)) {
      this.showErrorForm(input, this.asuntField, "completa este campo");
      return;
    } else if (!this.isBetween(input, min, max)) {
      this.showErrorForm(
        input,
        this.asuntField,
        `debe tener entre ${min} y ${max} caracteres`
      );
      return;
    }
    this.showSuccesForm(input);
    valid = true;
    return valid;
  };
  checkTel = (input) => {
    let valid = false;
    if (this.isEmpty(input)) {
      this.showErrorForm(input, this.phoneField, "completa este campo");
      return;
    } else if (!this.isPhoneValid(input)) {
      this.showErrorForm(input, this.phoneField, `ingrese un numero valido`);
      return;
    }
    this.showSuccesForm(input);
    valid = true;
    return valid;
  };
  checkEmail = (input) => {
    let valid = false;
    if (this.isEmpty(input)) {
      this.showErrorForm(input, this.emailField, "completa este campo");
      return;
    } else if (!this.isEmailValid(input)) {
      this.showErrorForm(input, this.emailField, `ingrese un email valido`);
      return;
    }
    this.showSuccesForm(input);
    valid = true;
    return valid;
  };
  checkMessage = (input) => {
    const min = 8;
    const max = 150;
    let valid = false;
    if (this.isEmpty(input)) {
      this.showErrorForm(input, this.messageField, "completa este campo");
      return;
    } else if (!this.isBetween(input, min, max)) {
      this.showErrorForm(
        input,
        this.messageField,
        `debe tener entre ${min} y ${max} caracteres`
      );
      return;
    }
    this.showSuccesForm(input);
    valid = true;
    return valid;
  };
  sendMessage = (e) => {
    e.preventDefault();
    const nameValid = this.checkName(this.formName);
    const phoneValid = this.checkTel(this.formPhone);
    const isEmailValid = this.checkEmail(this.formEmail);
    const asuntValid = this.checkAsunt(this.formAsunt);
    const messageValid = this.checkMessage(this.formMessage);
    const formValid =
      nameValid && phoneValid && isEmailValid && asuntValid && messageValid;
    if (formValid) {
      const asunt = this.formAsunt.value;
      const message = `
          mi nombre = ${this.formName.value},
          mi email = ${this.formEmail.value},
          mi telefono = ${this.formPhone.value},
          ${this.formMessage.value}`;

      this.resetInput(this.formAsunt);
      this.resetInput(this.formEmail);
      this.resetInput(this.formMessage);
      this.resetInput(this.formName);
      this.resetInput(this.formPhone);
      alert("mensaje enviado");
    }
  };
  init() {
    this.formAsunt.addEventListener("input", () => {
      this.checkAsunt(this.formAsunt);
    });
    this.formEmail.addEventListener("input", () => {
      this.checkEmail(this.formEmail);
    });
    this.formMessage.addEventListener("input", () => {
      this.checkMessage(this.formMessage);
    });
    this.formName.addEventListener("input", () => {
      this.checkName(this.formName);
    });
    this.formPhone.addEventListener("input", () => {
      this.checkTel(this.formPhone);
    });
    this.form.addEventListener("submit", this.sendMessage);
  }
}
