# validMejs 
your middleware validating assistant. just super easy and flexible...

[![Build Status](https://www.travis-ci.org/JojiAndela/validMejs.svg?branch=develop)](https://www.travis-ci.org/JojiAndela/validMejs) [![Maintainability](https://api.codeclimate.com/v1/badges/5de500b6c2c9c3a07f35/maintainability)](https://codeclimate.com/github/JojiAndela/validMejs/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5de500b6c2c9c3a07f35/test_coverage)](https://codeclimate.com/github/JojiAndela/validMejs/test_coverage)


# Installation
```bash
npm install valid_me_js
```
Also make sure that you have Node.js 6 or newer in order to use it.

# How to use

```javascript
import { middleware } from 'valid_me_js';

const signUpValidator = (req, res, next) => {
  const valid = middleware(req, res, next);
  valid
    .hasElement('email', 'Your Email')
    .hasElement('username', 'My Username')
    .hasElement('password', 'My password')
    .isEmail()
    .isLength('username', 3)
    .hasSpaces('username')
    .hasSpaces('password')
    .isLength('password', 8)
    .check();
};

const signInValidator = (req, res, next) => {
  const valid = middleware(req, res, next);
  valid
    .hasElement('email')
    .hasElement('password')
    .isEmail()
    .check();
};


export { signUpValidator, signInValidator };

```
then you can use it in the express router like this

``` javascript
import express from 'express';
import user from '../controllers/users';
import { signUpValidator, signInValidator } from '../middlewares/validator';

const { signup, login } = user;

const router = express.Router();

router.post('/', signInValidator, login);
router.post('/new', signUpValidator, signup);

export default router;
```
and get errors as 
```json
{
  "errors": [
      "tex is required",
      "myDate is an invalid date. Must not be later than today",
      "not making sense abi !!!",
      "length is bad",
      "no upper",
      "no number",
      "no special"
    ],
    "message": "Invalid Parameters"
}
```
# Changelog
Check the [GitHub Releases page](https://github.com/JojiAndela/validMejs/releases).

# Contributing
Bug reports and pull requests are welcome on GitHub at [https://github.com/jojiAndela/validmejs](https://github.com/jojiAndela/validmejs). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

# License
MIT License

# Code of Conduct
Everyone interacting in the NgBanks project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/%5BUSERNAME%5D/validmejs/blob/master/CODE_OF_CONDUCT.md).

