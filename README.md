# lazy_loading_vue

Vuejs custom directive for lazy loading.

## Installation

```bash
npm install lazy_loading_vue
```

## Usage example

Globally register custom directives at the app level:

```js
import Vlazyload from "lazy_loading_vue";

const app = createApp(App);

app.directive("lazy", Vlazyload);
```

An example of using a directive:

```vue
<template>
  <div class="wrapper" v-lazy:loader="exampleFuncLoadMorePosts">
    <div class="item" v-for="post in posts" :key="post.id">
      <div class="item-title">{{ post.title }}</div>
      <div class="item-body">{{ post.body }}</div>
    </div>
  </div>
</template>
```

Examples of styles for the loader, if you use it

```css
.lazyLoader {
  width: 50px;
  height: 50px;
}
.lazyLoader:after {
  content: " ";
  display: block;
  width: 30px;
  height: 30px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lazyLoader 1.2s linear infinite;
}
@keyframes lazyLoader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

Not recommended for use this directive with v-if, it is better to use v-show.
