const jwt = require("jsonwebtoken");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
                console.log("Google Profile:", profile);
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
                            role: "buyer",
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

                const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY);
                return done(null, { user, token });
            } catch (error) {
                return done(error, null);
            }
        })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
