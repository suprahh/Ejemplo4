export class scanData{

    info:string ;
    tipo:string ;

   constructor( texto:string){

    this.tipo = "no definido";
    this.info = texto;

    if (texto.startsWith("http")) {
        this.tipo = "http";

    }
  else if (texto.startsWith("geo")) {
        this.tipo = "Ubicacion";
   } else if(texto.startsWith("BEGIN:VCARD")) {
        
    this.tipo = "contacto";
    
    
   }else if(texto.startsWith("MATMSG"))
{
    this.tipo = "email"
}
else{
    this.tipo = "no definido";
}
    
        
   }

}