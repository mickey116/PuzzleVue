<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <!-- 當現在頁碼等於1不能按前一頁  -->
        <li class="page-item" :class="{'disabled':pages.current_page === 1}">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(pages.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 把所有頁碼呈現出來 利用動態class 當current_page 等於現在頁碼 就變成active -->
        <!-- 由父組件pagination傳值給pages  -->
        <li
          class="page-item"
          v-for="page in pages.total_pages"
          :key="page"
          :class="{'active':pages.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
        </li>
        <!-- 當現在頁碼等於總頁數時不能按下一頁  -->
        <li class="page-item" :class="{'disabled':pages.current_page === pages.total_pages}">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(pages.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pages'],
  methods: {
    changePage(page) {
      this.$emit('emitpage', page);
    },
  },
};
</script>

<style>
</style>
