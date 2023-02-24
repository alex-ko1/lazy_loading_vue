# lazy_loading_vue

Vuejs custom directive for lazy loading.

This directive works by following the last element in the list, and when you scroll to it, your function is called where you can add more content. You can also use a loader that will be visible until more content is added.

## Example

[Example on CodeSandbox](https://codesandbox.io/p/github/alex-ko1/lazy-load-directive/master?workspaceId=e57cc4af-8f45-46e7-973e-c6cee935f708&file=%2FREADME.md)

## Installation

```bash
npm install lazy_loading_vue --save
```

## Usage example

Globally register custom directives at the app level:

```js
import VLazyLoader from "lazy_loading_vue";

const app = createApp(App);

app.directive("lazy", VLazyLoader);
```

An example of using a directive:

Be sure to add the lazy-item class to each item in the list.

```vue
<template>
  <div class="wrapper" v-lazy:loader="exampleFuncLoadMorePosts">
    <div class="lazy-item" v-for="item in items" :key="item.id">
      <div class="title">{{ item.title }}</div>
      <div class="body">{{ item.body }}</div>
    </div>
  </div>
</template>
```
