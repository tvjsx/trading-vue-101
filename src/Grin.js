// Grin, your overlay friend

// Adds all necessary stuff for you.
import { Overlay } from 'trading-vue-js'

export default {
    name: 'Grin',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return {
                author: 'C451',
                version: '2.0.0'
            }
        },
        // Here goes your code. You are provided with:
        // { All stuff is reactive }
        // $props.layout -> positions of all chart elements +
        //  some helper functions (see layout_fn.js)
        // $props.interval -> candlestick time interval
        // $props.sub -> current subset of candlestick data
        // $props.data -> your indicator's data subset.
        //  Comes "as is", should have the following format:
        //  [[<timestamp>, ... ], ... ]
        // $props.colors -> colors (see TradingVue.vue)
        // $props.cursor -> current position of crosshair
        // $props.settings -> indicator custom settings
        //  E.g. colors, line thickness, etc. You define it.
        // ~
        // Finally, let's make the canvas dirty!
        draw(ctx) {
            const l = this.$props.layout
            const c = {
                x: l.width / 2,
                y: l.height / 2
            }
            ctx.lineWidth = 2
            ctx.strokeStyle = 'black'
            ctx.fillStyle = '#ffea03'
            // Strong Head
            ctx.beginPath()
            ctx.arc(c.x, c.y, 50, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.stroke()
            ctx.fillStyle = 'white'
            ctx.strokeStyle = 'black'
            // Wild Grin
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.strokeStyle = 'black'
            if (this.woo) ctx.arc(c.x, c.y, 42, -Math.PI * 0.1, Math.PI * 1.1)
            let d = this.woo ? 0 : 0.15
            let w = this.woo ? 2 : 0
            ctx.arc(c.x, c.y - (27 - w), 42, Math.PI * 0.9 - d, +Math.PI * .1 + d, true)
            if (this.woo) ctx.fill()
            ctx.stroke()
            ctx.beginPath()
            ctx.lineWidth = 0.25
            if (!this.woo) ctx.arc(c.x, c.y + 15, 25, Math.PI * 0.45, Math.PI * .6)
            ctx.stroke()
            ctx.lineWidth = 0.15
            ctx.beginPath()
            ctx.strokeStyle = 'black'
            var s1 = Math.PI * .1
            var s2 = Math.PI * 0.15

            if (this.woo)
                for (var k = 0; k < 0.85; k += 0.1) {
                    ctx.arc(c.x, c.y - 25, 43,
                        s1 + k * Math.PI,
                        s1 + (k + 0.01) * Math.PI, false)
                    ctx.arc(c.x, c.y, 42,
                        s2 + k * Math.PI,
                        s2 + (k + 0.01) * Math.PI, false)
                }

            ctx.stroke()
            // Eagle eyes
            ctx.beginPath()
            ctx.fillStyle = 'black'
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1
            ctx.moveTo(c.x - 17, c.y - 5)
            ctx.arc(c.x - 17, c.y - 5, 3, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.moveTo(c.x + 17, c.y - 5)
            ctx.arc(c.x + 17, c.y - 5, 3, 0, Math.PI * 2, true)
            ctx.fill()
            ctx.stroke()
            ctx.lineCap = "round"
            ctx.beginPath()
            ctx.lineWidth = 5
            if (this.woo) {
                ctx.moveTo(c.x - 25, c.y - 15 + 2)
                ctx.lineTo(c.x - 10, c.y - 7 + 2)
                ctx.moveTo(c.x + 25, c.y - 20 + 2)
                ctx.lineTo(c.x + 10, c.y - 7 + 2)
            }
            ctx.stroke()
        },

        // For all data with these types overlay will be
        // added to the renderer list. And '$props.data'
        // will have the corresponding values. If you want to
        // redefine the default behviour for a prticular
        // indicator (let's say EMA),
        // just create a new overlay with the same type:
        // e.g. use_for() { return ['EMA'] }.
        use_for() {
            return ['GRIN']
        },
        data_colors() {
            return ['yellow']
        },
        mousemove(e) {
            const l = this.$props.layout
            const c = {
                x: l.width / 2,
                y: l.height / 2
            }
            if (
                (c.x - e.clientX) * (c.x - e.clientX) +
                (c.y - e.clientY) * (c.y - e.clientY) <
                42 * 42
            ) {
                this.woo = true
            } else {
                this.woo = false
            }
        },
    },
    data() {
        // Define internal setting & constants here
        return {
            woo: false
        }
    }

}
