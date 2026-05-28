// Define cómo será la respuesta que recibimos del backend
export interface CheckInResponse {

  // Indica si el acceso fue exitoso o no
  success: boolean;

  // Mensaje que mostrará el sistema en pantalla
  message: string;

  // Datos opcionales del miembro
  member?: {

    // ID del miembro
    id: number;

    // Nombre del miembro
    name: string;
  };
}