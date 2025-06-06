import { AuthGuard } from "@nestjs/passport";

export class JWTAuthGuards extends AuthGuard('jwt') { }


/** Client Side ===HTTP Request==> Guard =====> Route Handler (@RequestMapping)
 * Guards are used to authenticate requests.
 * They are executed in the order they are defined.
 * They can be used to authenticate requests based on the request path, headers, etc.
 * They can be used to authenticate requests based on the request body, params, etc.
 * They can be used to authenticate requests based on the request query, etc.
 */