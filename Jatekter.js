import Negyzet from "../Negyzet.js";
class Jatekter {
  jatekos1 = "X";
  jatekos2 = "O";
  #negyzetek = [];
  #kovetkezo = false;
  #szuloElem;
  constructor(szuloElem) {
    this.#szuloElem = szuloElem;

    //Jatekter felépítése:
    this.#szuloElem.append(`<div class="jatekosok">
    <form id="myForm" onsubmit="return false">
      <label for="name1">1.es játékos:</label>
      <input type="text" name="name1">
      <label for="name2">2.es játékos:</label>
      <input type="text" name="name2">
      <input id="button" type="submit" value="Submit">
    </form></div>`);
    this.jatekosok = szuloElem.children("div:last-child");

    this.#szuloElem.append(
      `<div class='jatekAllapot'>${this.jatekos1} jön</div>`
    );
    this.jatekAllapotDiv = szuloElem.children("div:last-child");

    this.#szuloElem.append("<div class='tabla'></div>");
    this.tablaDiv = szuloElem.children("div:last-child");

    this.#szuloElem.append("<div class='jatekter'></div>");
    this.jatekterDiv = szuloElem.children("div:last-child");

    for (let index = 0; index < 9; index++) {
      this.#negyzetek.push(new Negyzet(index, 0, $(this.jatekterDiv)));
    }
    document.forms["myForm"].addEventListener("submit", () => {
      this.jatekos1 = document.forms["myForm"]["name1"].value;
      this.jatekos2 = document.forms["myForm"]["name2"].value;
      this.tablaUpdate(this.#kovetkezo);
    });
    $(window).on("lepes", () => {
      this.kor();
    });
  }
  jatekosNevek() {}
  kor() {
    this.#kovetkezo = !this.#kovetkezo;
    let para = this.#kovetkezo;
    this.#negyzetek[event.detail].setJatekos(para);
    this.tablaUpdate(para);
    this.vaneNyeres();
  }
  tablaUpdate(allapot) {
    if (allapot) {
      this.jatekAllapotDiv.html(`${this.jatekos2} jön`);
    } else this.jatekAllapotDiv.html(`${this.jatekos1} jön`);
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
    }
    if (nyeres) {
      this.jatekVege();
    }
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
}
export default Jatekter;
