
class Monstruo extends Personaje {
    constructor(nombre, alias, defensa, miedo, tipo) {
        super(nombre, tipo);
        this.defensa = defensa;
        this.miedo = miedo;
        this.alias = alias;
    }
}