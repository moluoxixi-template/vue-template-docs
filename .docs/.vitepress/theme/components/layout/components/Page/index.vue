<template>
  <FireWorksAnimation />
  <ShareCard />
  <h1 class="blog-title">
    Blogs
  </h1>
  <div class="flex flex-col items-center flex-1-hidden">
    <div class="w-full blogList flex flex-col items-center flex-1-auto">
      <a
        v-for="(item) in posts"
        :key="item.regularPath"
        class="blog"
        :href="withBase(item.regularPath)"
      >
        <div class="title">{{ item.frontMatter.title }}</div>
        <div class="date">{{ transDate(item.frontMatter.date) }}</div>
      </a>
    </div>
    <div class="pagination">
      <button v-if="pageCurrent > 1" class="left" @click="go(pageCurrent - 1)">
        Previous page
      </button>
      <div v-if="pagesNum > 1">
        {{ `${pageCurrent}/${pagesNum}` }}
      </div>
      <button v-if="pageCurrent < pagesNum" class="right" @click="go(pageCurrent + 1)">
        Next page
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ShareCard from './components/ShareCard.vue'
import FireWorksAnimation from './components/FireWorksAnimation.vue'
import { useData, withBase } from 'vitepress'
import type { PostType } from '../../../../../utils/utils.ts'

interface post {
  regularPath: string
  frontMatter: object
}

const { theme } = useData()

// get posts
let postsAll = theme.value.posts || []
// get postLength
const postLength = theme.value.postLength
// get pageSize
const pageSize = theme.value.pageSize

//  pagesNum
let pagesNum = postLength % pageSize === 0 ? postLength / pageSize : postLength / pageSize + 1
pagesNum = Number.parseInt(pagesNum.toString())
//pageCurrent
const pageCurrent = ref<number>(1)
// filter index post
postsAll = postsAll.filter((item: post) => {
  return item.regularPath.includes('index')
})
// pagination
const allMap = {}
for (let i = 0; i < pagesNum; i++) {
  allMap[i] = []
}
let index = 0
for (let i = 0; i < postsAll.length; i++) {
  if (allMap[index].length > pageSize - 1) {
    index += 1
  }
  allMap[index].push(postsAll[i])
}
// set posts
const posts = ref<PostType[]>([])
posts.value = allMap[pageCurrent.value - 1]
// click pagination
function go(i: number) {
  pageCurrent.value = i
  posts.value = allMap[pageCurrent.value - 1]
}
// timestamp transform
function transDate(date?: string) {
  const dateArray = date?.split('-') || []
  const year = dateArray[0]
  const day = dateArray[2]
  let month: string
  switch (dateArray[1]) {
    case '1':
    case '01':
      month = `Jan`
      break
    case '2':
    case '02':
      month = `Feb`
      break
    case '3':
    case '03':
      month = `Mar`
      break
    case '4':
    case '04':
      month = `Apr`
      break
    case '5':
    case '05':
      month = `May`
      break
    case '6':
    case '06':
      month = `Jun`
      break
    case '7':
    case '07':
      month = `Jul`
      break
    case '8':
    case '08':
      month = `Aug`
      break
    case '9':
    case '09':
      month = `Sep`
      break
    case '10':
      month = `Oct`
      break
    case '11':
      month = `Nov`
      break
    case '12':
      month = `Dec`
      break
    default:
      month = `Month`
  }
  return `${month} ${day}, ${year}`
}
</script>

<style scoped>
.blog-title {
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  margin-top: 24px;
}

.blogList {
  padding: 30px 0;
}

.blog {
  width: 85%;
  display: block;
  border-radius: 10px;
  padding: 0 20px;
  margin: 10px;
  background: var(--vp-c-bg);
  max-width: 600px;
  box-shadow: 6px 6px var(--vp-c-brand);
  border: 4px solid #3f4e4f;
  cursor: pointer;
}

.blog:hover {
  text-decoration: none;
  transform: translate(-2px, -2px);
  box-shadow: 10px 10px var(--vp-c-brand);
}

.title {
  color: var(--vp-c-brand-light);
  font-size: 1.2em;
  font-weight: bold;
}

.date {
  padding-bottom: 7px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-color-d);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
}

button::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--vp-c-color-d);
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.left {
  position: absolute;
  left: 0;
}

.right {
  position: absolute;
  right: 0;
}
</style>
