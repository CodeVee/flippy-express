import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { ServerError } from '../models/custom-error.model';

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET 
}
passport.use(
    new JWTStrategy(jwtOptions, async (token, done) => {
                try {
                    console.log(token)
                    const { id } = token;                    
                    const user = await Promise.resolve({ id })
                    return done(null, user);
                } catch (error) {
                    done(new ServerError());
                }
            }
        
    )
);

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await Promise.resolve({ username, password });
                return done(null, user, { message: 'User created successfully'});
            } catch (error) {
                done(new ServerError());
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await Promise.resolve({ username });

                if (!user) return done(null, false, { message: 'User not found' });

                const validate = await Promise.resolve(password === 'password');
                if (!validate) return done(null, false, { message: 'Wrong Password' });

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                done(new ServerError());
            }
        }
    )
);