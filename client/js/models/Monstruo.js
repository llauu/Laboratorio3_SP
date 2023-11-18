
class Monstruo extends Personaje {
    constructor(id, nombre, alias, defensa, miedo, tipo) {
        super(id, nombre, tipo);
        this.defensa = defensa;
        this.miedo = miedo;
        this.alias = alias;
    }
}