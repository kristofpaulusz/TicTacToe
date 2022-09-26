import Negyzet from "../Negyzet.js";
class Jatekter {#
    negyzetek = [];#
    kovetkezo = false;#
    szuloElem;
    o = "Kristóf";
    x = "Kriszti";
    constructor(szuloElem) {
        this.#szuloElem = szuloElem;

        //Játékosok neveinek a bekérése
        this.#szuloElem.append("<div class='jatekosBekeres'></div>");
        this.nevBekeresDiv = szuloElem.children("div:last-child");

        //Jatekter felépítése:
        this.#szuloElem.append("<div class='jatekAllapot'>Az X jön</div>");
        this.jatekAllapotDiv = szuloElem.children("div:last-child");

        this.#szuloElem.append("<div class='tabla'></div>");
        this.tablaDiv = szuloElem.children("div:last-child");

        this.#szuloElem.append("<div class='jatekter'></div>");
        this.jatekterDiv = szuloElem.children("div:last-child");

        for (let index = 0; index < 9; index++) {
            this.#negyzetek.push(new Negyzet(index, 0, $(this.jatekterDiv)));
        }

        $(window).on("lepes", () => {
            this.kor();
        });
    }
    kor() {
        this.#kovetkezo = !this.#kovetkezo;
        let para = this.#kovetkezo;
        this.#negyzetek[event.detail].setJatekos(para);
        this.tablaUpdate(para);
        this.vaneNyeres();
    }
    tablaUpdate(allapot) {
        if (allapot) {
            this.jatekAllapotDiv.html(`Az ${o} jön`);
        } else this.jatekAllapotDiv.html(`Az ${x} jön`);
    }
    vaneNyeres() {
        let nyeres = false;
        if (
            this.#negyzetek[0].getJatekos() == this.#negyzetek[1].getJatekos() &&
            this.#negyzetek[1].getJatekos() == this.#negyzetek[2].getJatekos() &&
            this.#negyzetek[0].getJatekos() != 0
        ) {
            console.log("It's a win 0 1 2");
            nyeres = true;
        }
        if (
            this.#negyzetek[3].getJatekos() == this.#negyzetek[4].getJatekos() &&
            this.#negyzetek[4].getJatekos() == this.#negyzetek[5].getJatekos() &&
            this.#negyzetek[3].getJatekos() != 0
        ) {
            console.log("It's a win 3 4 5");
            nyeres = true;
        }
        if (
            this.#negyzetek[6].getJatekos() == this.#negyzetek[7].getJatekos() &&
            this.#negyzetek[7].getJatekos() == this.#negyzetek[8].getJatekos() &&
            this.#negyzetek[6].getJatekos() != 0
        ) {
            console.log("It's a win 6 7 8");
            nyeres = true;
        }
        if (
            this.#negyzetek[0].getJatekos() == this.#negyzetek[3].getJatekos() &&
            this.#negyzetek[3].getJatekos() == this.#negyzetek[6].getJatekos() &&
            this.#negyzetek[0].getJatekos() != 0
        ) {
            console.log("It's a win 0 3 6");
            nyeres = true;
        }
        if (
            this.#negyzetek[1].getJatekos() == this.#negyzetek[4].getJatekos() &&
            this.#negyzetek[4].getJatekos() == this.#negyzetek[7].getJatekos() &&
            this.#negyzetek[1].getJatekos() != 0
        ) {
            console.log("It's a win 1 4 7");
            nyeres = true;
        }
        if (
            this.#negyzetek[2].getJatekos() == this.#negyzetek[5].getJatekos() &&
            this.#negyzetek[5].getJatekos() == this.#negyzetek[8].getJatekos() &&
            this.#negyzetek[2].getJatekos() != 0
        ) {
            console.log("It's a win 2 5 8");
            nyeres = true;
        }
        if (
            this.#negyzetek[0].getJatekos() == this.#negyzetek[4].getJatekos() &&
            this.#negyzetek[4].getJatekos() == this.#negyzetek[8].getJatekos() &&
            this.#negyzetek[0].getJatekos() != 0
        ) {
            console.log("It's a win 0 4 8");
            nyeres = true;
        }
        if (
            this.#negyzetek[2].getJatekos() == this.#negyzetek[4].getJatekos() &&
            this.#negyzetek[4].getJatekos() == this.#negyzetek[6].getJatekos() &&
            this.#negyzetek[2].getJatekos() != 0
        ) {
            console.log("It's a win 2 4 6");
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
            nyertes = "X";
        } else nyertes = "O";
        this.tablaDiv.html("Az " + nyertes + " nyert");
        this.jatekAllapotDiv.html("Vége");
    }
    nevBekeres() {
        this.nevBekeresDiv.html("<label for='txt' class='form-label'>X játékos:</label><input type='text' id='elso' value=''><br><label for='txt' class='form-label'>O játékos:</label><input type='text' id='masodik' value=''> <br><button id = 'btn'>ok</button>");

        $("#btn").on("click", () => {
            x = $('#elso')[0];
            o = $('#masodik')[0];
        });
    }

}
export default Jatekter;