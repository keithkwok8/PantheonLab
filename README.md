# PantheonLab

## Demo-App

It is the demo application build with react and typescript.

- `cd demo-app`
- `yarn`
- `yarn start`

The server will be started.

In this Demo-App, here implemented:
- auth w/ AWS Cognito
    - sign-in
    - sign-up
    - verify
    - sign-out
- Q1
    - locate at video page
    - play the scenes
- Q2
    - Calling the Q2 API
    - Using the cognito auth (i.e. JWT)
    - Display the response


## Backend

Before testing locally, you have to install a global package
`yarn add -g serverlesss`

It is the demo api handler build with serverless.
- `cd backend`
- `yarn`
- `sls offline`

The API server will be started locally

The API *already* deployed to AWS as a lambda function. The below is the endpoint.
https://4wxqlar62i.execute-api.ap-east-1.amazonaws.com

- ping
    - you may test basic ping function, by
    - https://4wxqlar62i.execute-api.ap-east-1.amazonaws.com
- search
    - https://4wxqlar62i.execute-api.ap-east-1.amazonaws.com/api/photo/search
    - Method: `GET`
    - queryString: `keyWord`

Example of The photo search
```
curl --location 'https://4wxqlar62i.execute-api.ap-east-1.amazonaws.com/api/photo/search?keyWord=test' \
--header 'authorization: eyJraWQiOiI4VG9VOUp6Q1MydEVtZXREM204dDlORmNOdVlLYzNPTnYyNHlMdEJwU0JJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI3NzQ0NmFjOC1lMDYxLTcwMTctODM3Ny05NTJkZWJlOGE1YzAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfYks1VUtHNHplIiwiY2xpZW50X2lkIjoiNzNvcGlpbmxvMTl0ZTczMjllNGUzYzk5cTIiLCJvcmlnaW5fanRpIjoiMmJmM2YzOTQtMDYyYS00M2NjLWE1NDctNmNkNzRiNTEwOGRlIiwiZXZlbnRfaWQiOiIzMDcxYmU5ZC1hMzJiLTRjYjktOGRjNi1mMjdlZTU1OTY4YWEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNzE0MzcyNTYxLCJleHAiOjE3MTQzNzYxNjEsImlhdCI6MTcxNDM3MjU2MSwianRpIjoiYWYyYjQ2OGEtYzM3My00NzFlLWJhMzEtODcyM2MyZmU5NDJlIiwidXNlcm5hbWUiOiI3NzQ0NmFjOC1lMDYxLTcwMTctODM3Ny05NTJkZWJlOGE1YzAifQ.qwi0dD-mpX5kNwhidaWrmBvPoYn6v0coL5DktPej7JsAv12JTv09BvwgglCWzXZB2xgX-WRQ4CV2wvMuuizECkidmIJvwS1cyhE90qS1VZWw2IvzquSKp8flWoA0TBqOP92s6XeuZ1so61EB5-49JKRILg8iNxXg4ecc_aKdA6I1DFca2fh1-kwgq_mTfqqF6CDA4lYsD0f8caED55LzvDozTWuEDgxQzrYMIUoX1k7ipGIfFI3hsgso516afLLP7-YXpxJ9IyG7pIeqbJcGCSoQ016XQWptkTbfauexzM4wlU-ETIZlyNIs9yVyjIrGs_px7C2WiLkH0RHLPG6aZA'
```

Example of The Response
```
{
    "message": "success",
    "success": true,
    "data": [
        {
            "image_ID": "oXV3bzR7jxI",
            "thumbnails": "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTU3NTF8MHwxfHNlYXJjaHwxfHx0ZXN0fGVufDB8fHx8MTcxNDM2OTQ0MHww&ixlib=rb-4.0.3&q=80&w=200",
            "preview": "https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTU3NTF8MHwxfHNlYXJjaHwxfHx0ZXN0fGVufDB8fHx8MTcxNDM2OTQ0MHww&ixlib=rb-4.0.3&q=80&w=1080",
            "title": "person using pencil",
            "source": "Unsplash",
            "tags": [
                "test",
                "school",
                "graph"
            ]
        },
        {
            "image_ID": "ViEBSoZH6M4",
            "thumbnails": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTU3NTF8MHwxfHNlYXJjaHwyfHx0ZXN0fGVufDB8fHx8MTcxNDM2OTQ0MHww&ixlib=rb-4.0.3&q=80&w=200",
            "preview": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTU3NTF8MHwxfHNlYXJjaHwyfHx0ZXN0fGVufDB8fHx8MTcxNDM2OTQ0MHww&ixlib=rb-4.0.3&q=80&w=1080",
            "title": "brown pencil on equation paper",
            "source": "Unsplash",
            "tags": [
                "school",
                "math",
                "homeschool"
            ]
        },
        {
            "image_ID": "4JxV3Gs42Ks",
            "thumbnails": "https://images.unsplash.com/photo-1520004434532-668416a08753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTU3NTF8MHwxfHNlYXJjaHwzfHx0ZXN0fGVufDB8fHx8MTcxNDM2OTQ0MHww&ixlib=rb-4.0.3&q=80&w=200",
            "preview": "https://images.unsplash.com/photo-1520004434532-668416a08753?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1OTU3NTF8MHwxfHNlYXJjaHwzfHx0ZXN0fGVufDB8fHx8MTcxNDM2OTQ0MHww&ixlib=rb-4.0.3&q=80&w=1080",
            "title": "white printer paper",
            "source": "Unsplash",
            "tags": [
                "paper",
                "blank",
                "background"
            ]
        },
        ...
    ]
}
```