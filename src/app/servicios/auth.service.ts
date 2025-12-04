import { createNgModule, EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, tap, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL base del módulo de usuarios en tu backend.
  private apiUrl = 'http://localhost/api_proyecto/public/users';

  // Indica si el código corre en navegador (true) o en servidor (false, en SSR).
  private isBrowser: boolean;

  // Evento que notifica al resto de la aplicación que el usuario inició sesión.
  // El NavComponent lo escucha para actualizar usuario + carrito.
  loginEvent = new EventEmitter<void>();

  constructor(
    private http: HttpClient,

    // PLATFORM_ID permite saber si estamos en entorno browser o server-side.
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Determina si estamos en navegador para permitir el uso de localStorage.
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------
  login(credentials: { email: string; password: string }): Observable<any> {

    // Envía las credenciales al backend.
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(

      // tap() permite ejecutar código colateral sin modificar la respuesta.
      tap((response: any) => {

        // Si hay token válido y estamos en navegador:
        if (response?.token && this.isBrowser) {

          // Guarda token en localStorage para mantener sesión.
          localStorage.setItem('token', response.token);

          // Guarda datos del usuario para usarlos en la app.
          localStorage.setItem('usuario', JSON.stringify(response.usuario));

          // Emite un evento global para que otros componentes reaccionen.
          // El NavComponent escucha este evento para recargar usuario y carrito.
          this.loginEvent.emit();
        }
      })
    );
  }

  // ---------------------------------------------------------
  // REGISTER
  // ---------------------------------------------------------
  register(usuario: { nombre: string; email: string; password: string;
rol?: string }): Observable<any> {
    // Envía datos del nuevo usuario al backend.
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  // ---------------------------------------------------------
  // LOGOUT
  // ---------------------------------------------------------
  logout(): void {
    // Limpia datos guardados de sesión.
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  }

  // ---------------------------------------------------------
  // TOKEN
  // ---------------------------------------------------------
  getToken(): string | null {
    // Si no es navegador, no usar localStorage.
    if (!this.isBrowser) return null;

    return localStorage.getItem('token');
  }

  // ---------------------------------------------------------
  // OBTENER USUARIO
  // ---------------------------------------------------------
  getUsuario(): any {
    if (!this.isBrowser) return null;

    const raw = localStorage.getItem('usuario');

    // Si no existe o es inválido, devolvemos null.
    if (!raw || raw === 'undefined' || raw === 'null') {
      return null;
    }

    // Intentamos parsear JSON del usuario guardado.
    try {
      return JSON.parse(raw);
    } catch (e) {
      // Si el JSON está corrupto, limpiamos y devolvemos null.
      console.warn('JSON inválido en usuario, limpiando storage');
      localStorage.removeItem('usuario');
      return null;
    }
  }

  // ---------------------------------------------------------
  // LOGIN STATUS
  // ---------------------------------------------------------
  isLoggedIn(): boolean {
    // Retorna true si hay token guardado.
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token');
  }

  // ---------------------------------------------------------
  // ADMIN CHECK
  // ---------------------------------------------------------
  esAdmin(): boolean {
    // Obtiene usuario y verifica su rol.
    const usuario = this.getUsuario();
    return usuario?.rol === 'admin';
  }


  obtenerUsuarios() {
    return this.http.get<any[]>(`${this.apiUrl}`, {
      headers: this.getAuthHeaders(false)
    });
  }


  actualizarUsuario(id: number, formData: FormData): Observable<any> {
    console.log(formData.values);
    formData.forEach(i => console.log(i.toString));
    formData.append('_method', 'PUT');
    return this.http.post(`${this.apiUrl}/${id}`, formData,
      {
        headers: this.getAuthHeaders(false)
      });
  }

  deshabilitarUsuario(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  // ============================================================
  // HEADERS DE AUTENTICACIÓN
  // Si json=true → se agrega Content-Type: application/json
  // Si json=false → se omite para enviar FormData
  // ============================================================
  private getAuthHeaders(json: boolean = true): HttpHeaders {
    const token = (typeof localStorage !== 'undefined')
      ? localStorage.getItem('token') || ''
      : '';

    // Siempre enviamos el token.
    const headers: any = { Authorization: `Bearer ${token}` };

    // Solo agregamos JSON cuando NO se envía FormData.
    if (json) {
      headers['Content-Type'] = 'application/json';
    }

    return new HttpHeaders(headers);
  }
  // MIO
  //
  //
  //
  //
  // private userSubject = new BehaviorSubject<User[]>([]);
  // user$ = this.userSubject.asObservable();
  // urlBase = 'http://localhost/proyecto/public/users';
  // private currentUserSubject = new BehaviorSubject<User | null>(null);
  // currentUser$ = this.currentUserSubject.asObservable();

  // register(user: any) : Observable<any>{
  //   return this.http.post(`${this.urlBase}/register`, user);
  // }

  // //Envía credenciales y recibe la respuesta
  // login(credentials: any) : Observable<any>{
  //   return this.http.post(`${this.urlBase}/login`, credentials);
  // }

  // getAll() {
  //   return this.http.get<User[]>(`${this.urlBase}`);
  // }

  // cargarUsuarios(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.urlBase}`).pipe(
  //     tap((users) => this.userSubject.next(users))
  //   );
  // }

  // //Guarda el rol y el token del usuario en el almacenamiento en el almacenamiento local
  // guardarSesion(token: string, rol:string){
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('rol', rol);
  // }

  // //Retorna el rol almacenado, o null si no existe
  // obtenerRol(): string | null{
  //   return localStorage.getItem('rol');
  // }

  // //Indica si el usuario es admin
  // esAdmin(): boolean{
  //   return localStorage.getItem('rol')=== 'admin';
  //   return true;
  // }

  // //Elimina los datos de la sesión almacenada
  // logout(){
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('rol');
  // }

  // estaLogeado(){

  // }
  // // get currentUsers(): User[] {
  // //   return this.userSubject.value;
  // // }

  // constructor(private http: HttpClient) { }
}
