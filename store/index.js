export const strict = false
import JWTDecode from 'jwt-decode';
import cookieParser from "cookieparser";    

export const actions = {
    nuxtServerInit({ commit }, req){
        if(process.server && process.static) return;
        if(!req.req.headers.cookie) return;

        const parsed = cookieParser.parse(req.req.headers.cookie);
        const accessTokenCookie = parsed.access_token;
        const accTypeCookie = parsed.accType;

        if(!accessTokenCookie) return;
        if(!accTypeCookie) return;

        const decoded = JWTDecode(accessTokenCookie);
        
        if(decoded){
            commit('account/setUser', {
                phoneNumber: decoded.phoneNumber,
                displayName: decoded.displayName,
                email: decoded.email,
                uid: decoded.user_id,
                admin:decoded.admin,
            })
        }
        if(accTypeCookie){
            commit('account/setAccountType', accTypeCookie)
        }
        
        
    }
}