const passport=require('passport');
const localStratergy=require('passport-local').Strategy;
const {database}=require('../config/helper');
const PasswordHash= require('password-hash');
const GoogleStratergy=require('passport-google-oauth20').Strategy;
passport.use(
    new localStratergy({
        usernameField:'email'
    },
    function(username,password,done){
        let sql=`SELECT * FROM users WHERE email= "${username}"`;
        database.query(sql,(err,result)=>{
            if(err){
                return done(err);
            }
            if(result.length>0){
                if(PasswordHash.verify(password,result[0].password)){
                    return done(null,result[0]);
                }else{
                    return done(null,false,{message:'Email Or Password Does not match'});
                }
            }else{
                return done(null,false,{message:'Email Or Password Does not match'});
            }
        })
    })
);
passport.use(
    new GoogleStratergy({
    callbackURL:'/user/google/redirect',
    clientID:"610071308585-23l7dsciudfmsechc09tj74ov9o637ad.apps.googleusercontent.com",
    clientSecret:"hpy01fJ-v27WMUrHyuZ3P8Mv"
},function(accessToken,refreshToken,profile,done){
    let sql=`SELECT id FROM users WHERE googleid='${profile.id}'`;
    database.query(sql,(err,results)=>{
        if(results.length>0){
            return done(null,results[0]);
        }else{
            let sql=`INSERT INTO users (id,googleid,username,password,email,photoUrl,DOB) Values(
                '',
                '${profile.id}',
                '${profile.displayName}',
                '${PasswordHash.generate('nullable')}',
                '${profile.emails[0].value}',
                '${profile.photos[0].value}',
                ''
            )`;
            database.query(sql,function(err,result){
                if(result.length>0){
                    return done(null,results[0]);
                }
            })
        }
    });
})
);