import unified from 'unified'
import markdown from 'remark-parse'
import stringify from 'rehype-stringify'
import rehype from 'remark-rehype'
import iframe from 'remark-iframes'
import align from 'remark-text-alignment'
import color from 'remark-color-text'

// Import this since remark-iframe needs it
import 'regenerator-runtime/runtime'

export default (text) => {
  return unified()
    .use(markdown, {
      blocks: []
    })
    .use(iframe, {
      'www.youtube.com': {
        tag: 'iframe',
        width: 560,
        height: 315,
        disabled: false,
        replace: [
          ['watch?v=', 'embed/'],
          ['http://', 'https://']
        ],
        thumbnail: {
          format: 'http://img.youtube.com/vi/{id}/0.jpg',
          id: '.+/(.+)$'
        },
        removeAfter: '&'
      },
      'youtu.be': {
        tag: 'iframe',
        width: 560,
        height: 315,
        disabled: false,
        replace: [
          ['watch?v=', 'embed/'],
          ['http://', 'https://']
        ],
        thumbnail: {
          format: 'http://img.youtube.com/vi/{id}/0.jpg',
          id: '.+/(.+)$'
        },
        removeAfter: '&'
      },
      'soundcloud.com': {
        tag: 'iframe',
        width: '100%',
        height: 150,
        disabled: false,
        replace: [
          [
            'soundcloud.com/',
            'w.soundcloud.com/player/?visual=true&url=https://soundcloud.com/'
          ],
          ['http://', 'https://']
        ]
      }
    })
    .use(align)
    .use(rehype)
    .use(stringify)
    .use(color)
    .processSync(text)
    .toString()
}
