# SuggestMeAnime

It's my first finished React application. SuggestMeAnime allows you to discover new exciting anime. 
Everything works on client-side thanks to [JikanAPI](https://github.com/jikan-me/jikan) and [React-router](https://github.com/ReactTraining/react-router).

**Remember to check [JikanAPI docs](https://jikan.docs.apiary.io/#introduction/information/rate-limiting) before using**

## JikanAPI Search visualization
You can use SuggestMeAnime to visualize [JikanAPI Search](https://jikan.docs.apiary.io/#reference/0/search) request results. If you want to use it this way, don't set your MAL Profile in app because it will filter out anime from your list so the the results will be inaccurate.
The Item parameter allows you to move through the results array.

### Example
path
```
/&genre=1&order_by=score&page=1&item=1
```
should fetch top rated action anime.

You can also use MAL ID parametr
```
/&mal_id=1
```
should fetch Cowboy Bebop