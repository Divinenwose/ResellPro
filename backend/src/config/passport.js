const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { User } = require("../models/User");
const UserSocialAccount = require("../models/UserSocialAccount");

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let userSocialAccount = await UserSocialAccount.findOne({
                    provider: "google",
                    provider_user_id: profile.id
                });

                let user;
                if (userSocialAccount) {
                    user = await User.findById(userSocialAccount.user._id);
                } else {
                    user = await User.findOne({ email: profile.emails[0].value });
                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            password: null,
                            roles: ["buyer"],
                            is_verified_email: true,
                            phone: '',
                        });
                        await user.save();
                    }
                    userSocialAccount = new UserSocialAccount({
                        provider: "google",
                        provider_user_id: profile.id,
                        user: user._id,
                        metadata: {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            profile: profile,
                        }
                    });
                    await userSocialAccount.save();
                }

                const token = jwt.sign({ _id: user._id, email: user.email, roles: user.roles }, process.env.JWT_SECRET_KEY);
                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        })
);

passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'displayName','email'],
        
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Facebook Profile:", profile);
            try {
                let userSocialAccount = await UserSocialAccount.findOne({
                    provider: "facebook",
                    provider_user_id: profile.id
                });

                let user;
                if (userSocialAccount) {
                    user = await User.findById(userSocialAccount.user._id);
                } else {
                    if(profile.emails && profile.emails[0].value){
                        user = await User.findOne({ email: profile.emails[0].value });
                    }else{
                        user = await User.findOne({ email: profile.id + "@facebook.com" });
                    }
                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            email: profile.id + "@facebook.com",
                            password: null,
                            roles: ["buyer"],
                            is_verified_email: true,
                            phone: '',
                        });
                        await user.save();
                    }
                    userSocialAccount = new UserSocialAccount({
                        provider: "facebook",
                        provider_user_id: profile.id,
                        user: user._id,
                        metadata: {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            profile: profile,
                        }
                    });
                    await userSocialAccount.save();
                }

                const token = jwt.sign({ _id: user._id, email: user.email, roles: user.roles }, process.env.JWT_SECRET_KEY);
                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
