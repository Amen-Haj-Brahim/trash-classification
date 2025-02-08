# trash-classification-twise-night-challenge

### classification of trash images by fine tuning vgg16 on 2 classes

### classes=[dirty,clean]

### model link because it's too big for github's max size

https://drive.google.com/file/d/1dauOSzGE3YdlqygsyWdqOXmsuTvmIurK/view?usp=sharing

#### download it and put it in "mobile app/"

### to run this

### make a python venv

```
python -m venv .venv
cd .venv
cd Scripts
./activate
```

```
pip install requirements.txt
```

### and

```
cd "mobile app"
cd "Trash_Classification"
npm i
```

### to start the mobile app

```
npx expo start
```

### to start the api

```
fastapi run api.py
```

### Application demo

![plot](./demo.png)
