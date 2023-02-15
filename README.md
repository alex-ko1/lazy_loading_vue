# lazy_loading_vue

Vuejs custom directive for lazy loading

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

Not recommended for use with v-if, it is better to use v-show
