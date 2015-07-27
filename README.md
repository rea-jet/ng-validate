# ng-validate

[gh-pages]: "https://rea-jet.github.io/ng-validate/demo/"

## Demo

[Demo][gh-pages]

## Usage

Install:
```
npm i rea-ng-validate
```

JS:
```js
  angular.module('app', ['rea.misc.validate']);
```

HTML:
```html
<form>
  <div class="form-group" rea-validate-group>
    <label class="control-label">Email address</label>
    <input
      type="email"
      class="form-control"
      placeholder="Email"
      ng-model="app.form.email"
      ng-pattern="/[a-zA-Z-_\.]@[a-zA-Z-_\.]/"
      rea-validate
      >
      <span
        rea-validate-hint
        class="help-block"
      >This text describes the error and is only visible if the above input is in error-state</span>
  </div>
</form>
```


