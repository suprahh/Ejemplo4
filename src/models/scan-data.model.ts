export class scanData{

    info:string ;
    tipo:string ;

   constructor( texto:string){

    this.tipo = "no definido";
    this.info = texto;

    if (texto.startsWith("http")) {
        this.tipo = "http";

    }
   if (texto.startsWith("map")) {
        this.tipo = "Ubicacion";
   } else {
        this.tipo = "no definido";
    
   }
    
        
   }

}