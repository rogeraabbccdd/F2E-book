<template>
	<div class="theme-options">
		<ul class="color-theme-options">
			<li>
				<a href="#" class="default-theme" @click.prevent="setTheme()"></a>
			</li>
			<li v-for="(value, key) in themePicker" :key="key">
				<a href="#" :class="`${key}-theme`" :style="{background: value}" @click.prevent="setTheme(key)"></a>
			</li>
		</ul>
    <input type="radio" id="dark-check" style="vertical-align: middle;" v-if="isPreferDark" checked>
    <input type="checkbox" id="dark-check" style="vertical-align: middle;" v-model="darkTheme" v-else>
    <label for="dark-check">Enable Dark Theme</label>
	</div>
</template>

<script>

export default {
  name: 'ThemeOptions',

  data () {
    return {
      darkTheme: false,
      reco: {}
    }
  },

  computed: {
    themePicker () {
      return this.$themeConfig.themePicker || {
        red: '#f26d6d',
        blue: '#2196f3',
        green: '#3eaf7c',
        orange: '#fb9b5f'
      }
    },
    isPreferDark () {
      return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('content')
        .replace(/"/g, '') === 'dark'
    }
  },

  mounted () {
    const theme = localStorage.getItem('reco-theme')
    if (theme) this.setTheme(theme)

    // local storage
    const dark = localStorage.getItem('reco-dark')
    if(dark || this.isPreferDark)  this.darkTheme = true
    else if(this.$themeConfig.defaultDark) this.darkTheme = this.$themeConfig.defaultDark
    else this.darkTheme = false
    localStorage.setItem('reco-dark', this.darkTheme)
    this.setDarkTheme()
  },

  methods: {
    setTheme (theme, moveClass = true) {
      const classes = document.body.classList
      const themes = Object.keys(this.themePicker).map(colorTheme => `reco-theme-${colorTheme}`)

      if (!theme) {
        if (moveClass) localStorage.removeItem('reco-theme')
        classes.remove(...themes)
        return
      }

      classes.remove(...themes.filter(t => t !== `reco-theme-${theme}`))

      if (moveClass) {
        classes.add(`reco-theme-${theme}`)
        localStorage.setItem('reco-theme', theme)
      } else {
        localStorage.removeItem('reco-theme')
        classes.remove(`reco-theme-${theme}`)
      }
    },
    setDarkTheme () {
      const classes = document.body.classList
      localStorage.setItem('reco-dark', this.darkTheme)
      if (this.darkTheme) classes.add(`reco-theme-dark`)
      else classes.remove(`reco-theme-dark`)
    }
  },
  watch: {
    darkTheme () {
      this.setDarkTheme()
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/recoConfig.styl'

.color-theme-options {
	display: flex;
	flex-wrap wrap
	li {
		width: 20%;
		text-align: center;
		a {
			width: 15px;
			height: 15px;
			border-radius: $borderRadius
			&.default-theme {
				background-color: $accentColor;
			}
		}
	}
}
</style>
