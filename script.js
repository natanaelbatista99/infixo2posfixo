function infixo2posfixo(){

  class Pilha {

    constructor() {
      this._top = null;
      this._count = 0;
    }

    GetCount = function () {
      return this._count;
    }

    GetTop = function () {
      if (this._top) {
        return this._top.data;
      }
      return null;
    }

    Push = function (data) {
      let node = {
        data: data,
        next: null
      };

      node.next = this._top;
      this._top = node;
      this._count++;
    }

    Pop = function () {
      if (this._top) {
        let out = this._top;
        this._top = this._top.next;

        if (this._count > 0) {
          this._count--;
        }

        return out.data;
      }

      return null;
    }

    GetTodos = function () {
      if (this._top) {
        let arr = new Array();
        let current = this._top;

        for (let i = 0; i < this._count; i++) {
          arr[i]  = current.data;
          current = current.next;
        }

        return arr;
      }

      return null;
    }
  }

  let pilha = new Pilha();
  const equacao = document.getElementById('equacao').value;
  document.getElementById("resultado").value = '';

  for(let i=0; i<equacao.length; i++){

    if(!isNaN(equacao[i])) document.getElementById("resultado").value = document.getElementById("resultado").value + equacao[i];
    else if(equacao[i] != '(' && equacao[i] != ')'){

        if(equacao[i] == '*' || equacao[i] == '/') {

          let op = pilha.Pop();

          if(op != null) {

            if(op == '(') pilha.Push(op);
            if(op == '+' || op == '-') pilha.Push(op);
            else if(op != '(') document.getElementById("resultado").value = document.getElementById("resultado").value + op; 
          }
          pilha.Push(equacao[i]); 
        }
        else {
          let op = pilha.Pop();

          if(op == '(') pilha.Push(op);
          if(op != null && op != '(') document.getElementById("resultado").value = document.getElementById("resultado").value + op;
          pilha.Push(equacao[i]);
        }
      }
      else if(equacao[i] == '(') pilha.Push(equacao[i]);
      else {
        let op = pilha.Pop()

        while(op != null && op != '(') {
          document.getElementById("resultado").value = document.getElementById("resultado").value + op;

          op = pilha.Pop()
        }
      }
  }
  let op = pilha.Pop()

  while(op!= null) {
    document.getElementById("resultado").value = document.getElementById("resultado").value + op;

    op = pilha.Pop()
  }
}



