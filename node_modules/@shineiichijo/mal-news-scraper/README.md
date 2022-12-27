# mal-news-scraper

[![NPM](https://img.shields.io/badge/Available%20On-NPM-lightgrey.svg?logo=npm&logoColor=339933&labelColor=white&style=flat-square)](https://www.npmjs.com/package/@shineiichijo/mal-news-scraper)

Scrap news contents from MyAnimeList

---

## Installation
```
yarn add @shineiichijo/mal-news-scraper
```

## Usage
```ts
import { scrapNews } from '@shineiichijo/mal-news-scraper'
;(async () => {
    const id = 66853767
    const data = await scrapNews(id)
    console.log(data)
})()
```
### Output
```JSON
{
    "id": "66853767",
    "url": "https://myanimelist.net/news/66853767",
    "image": "https://cdn.myanimelist.net/s/common/uploaded_files/1657685189-06702246fa60423ef634534239999439.jpeg",
    "description": "The official website of the One Piece Film: Red anime movie revealed a pair ....",
    "title": "'One Piece Film: Red' Reveals Additional Pair of Cast"
}
```

### Scrapping with `mal-scraper`
```ts
import { getNewsNoDetails } from 'mal-scraper' //yarn add mal-scraper
import { scrapNews } from '@shineiichijo/mal-news-scraper'
;(async () => {
    const news = await getNewsNoDetails()
    const link = news[0].link // --> https://myanimelist.net/news/66853767
    const data = await scrapNews(link)
    console.log(data)
})()
```