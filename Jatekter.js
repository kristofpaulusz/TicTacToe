import Negyzet from "../Negyzet.js";
class Jatekter {
  #negyzetek = [];
  #kovetkezo = false;
  #szuloElem;
  o = "O";
  x = "X";
  constructor(szuloElem) {
    this.#szuloElem = szuloElem;

    //Játékosok neveinek a bekérése
    this.#szuloElem
      .append(`<div class='jatekosBekeres'><form id="myForm" action="" onsubmit="return false">
    <label for='txt' class='form-label'>X játékos:</label>
    <input type='text' name='elso' value=''><br>
    <label for='txt' class='form-label'>O játékos:</label>
    <input type='text' name='masodik' value=''><br>
    <button id = 'btn' >ok</button>
</form></div>`);
    this.nevBekeresDiv = szuloElem.children("div:last-child");

    //Jatekter felépítése:
    this.#szuloElem.append(`<div class='jatekAllapot'>${this.x} jön</div>`);
    this.jatekAllapotDiv = szuloElem.children("div:last-child");

    this.#szuloElem.append("<div class='tabla'></div>");
    this.tablaDiv = szuloElem.children("div:last-child");

    this.#szuloElem.append("<div class='jatekter'></div>");
    this.jatekterDiv = szuloElem.children("div:last-child");

    for (let index = 0; index < 9; index++) {
      this.#negyzetek.push(new Negyzet(index, 0, $(this.jatekterDiv)));
    }

    $("#btn").on("click", () => {
      this.x = document.forms["myForm"]["elso"].value;
      this.o = document.forms["myForm"]["masodik"].value;
      this.tablaUpdate(this.#kovetkezo);
    });

    $(window).on("lepes", (event) => {
      this.kor(event.detail);
    });
  }
  kor(id) {
    this.#kovetkezo = !this.#kovetkezo;
    let para = this.#kovetkezo;
    this.#negyzetek[id].setJatekos(para);
    this.tablaUpdate(para);
    this.vaneNyeres();
  }
  tablaUpdate(allapot) {
    if (allapot) {
      this.jatekAllapotDiv.html(`Az ${this.o} jön`);
    } else this.jatekAllapotDiv.html(`Az ${this.x} jön`);
  }
  vaneNyeres() {
    let nyeres = false;

    if (
      this.#negyzetek[0].getJatekos() == this.#negyzetek[1].getJatekos() &&
      this.#negyzetek[1].getJatekos() == this.#negyzetek[2].getJatekos() &&
      this.#negyzetek[0].getJatekos() != 0
    ) {
      // console.log("It's a win 0 1 2");
      nyeres = true;
    } else if (
      this.#negyzetek[3].getJatekos() == this.#negyzetek[4].getJatekos() &&
      this.#negyzetek[4].getJatekos() == this.#negyzetek[5].getJatekos() &&
      this.#negyzetek[3].getJatekos() != 0
    ) {
      // console.log("It's a win 3 4 5");
      nyeres = true;
    } else if (
      this.#negyzetek[6].getJatekos() == this.#negyzetek[7].getJatekos() &&
      this.#negyzetek[7].getJatekos() == this.#negyzetek[8].getJatekos() &&
      this.#negyzetek[6].getJatekos() != 0
    ) {
      // console.log("It's a win 6 7 8");
      nyeres = true;
    } else if (
      this.#negyzetek[0].getJatekos() == this.#negyzetek[3].getJatekos() &&
      this.#negyzetek[3].getJatekos() == this.#negyzetek[6].getJatekos() &&
      this.#negyzetek[0].getJatekos() != 0
    ) {
      // console.log("It's a win 0 3 6");
      nyeres = true;
    } else if (
      this.#negyzetek[1].getJatekos() == this.#negyzetek[4].getJatekos() &&
      this.#negyzetek[4].getJatekos() == this.#negyzetek[7].getJatekos() &&
      this.#negyzetek[1].getJatekos() != 0
    ) {
      // console.log("It's a win 1 4 7");
      nyeres = true;
    } else if (
      this.#negyzetek[2].getJatekos() == this.#negyzetek[5].getJatekos() &&
      this.#negyzetek[5].getJatekos() == this.#negyzetek[8].getJatekos() &&
      this.#negyzetek[2].getJatekos() != 0
    ) {
      // console.log("It's a win 2 5 8");
      nyeres = true;
    } else if (
      this.#negyzetek[0].getJatekos() == this.#negyzetek[4].getJatekos() &&
      this.#negyzetek[4].getJatekos() == this.#negyzetek[8].getJatekos() &&
      this.#negyzetek[0].getJatekos() != 0
    ) {
      // console.log("It's a win 0 4 8");
      nyeres = true;
    } else if (
      this.#negyzetek[2].getJatekos() == this.#negyzetek[4].getJatekos() &&
      this.#negyzetek[4].getJatekos() == this.#negyzetek[6].getJatekos() &&
      this.#negyzetek[2].getJatekos() != 0
    ) {
      // console.log("It's a win 2 4 6");
      nyeres = true;
    } else {
      /*NEM LEHET MEGCSINÁLNI */
      let dontetlen = true;

      let i = 0;
      while (dontetlen && i < 9) {
        if (this.#negyzetek[i].getJatekos() == 0) {
          dontetlen = false;
        }
        i++;
      }

      if (dontetlen) {
        this.dontetlen();
      }
    }
    if (nyeres) {
      this.jatekVege();
    }
  }
  dontetlen() {
    this.tablaDiv.html("Döntetlen");
    this.jatekAllapotDiv.html("Vége");
  }
  jatekVege() {
    $(window).off("lepes");
    let nyertes;
    if (this.#kovetkezo) {
      nyertes = this.jatekos1;
    } else nyertes = this.jatekos2;
    this.tablaDiv.html(nyertes + " nyert");
    this.jatekAllapotDiv.html("Vége");
  }
  //   nevBekeres() {
  //     this.nevBekeresDiv.html();
  //   }
}
export default Jatekter;
