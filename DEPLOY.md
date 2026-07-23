# How to Deploy All 8 Projects to GitHub Pages

## One-time setup (run once)
```
git config --global core.longpaths true
git config --global user.email "your-email@gmail.com"
git config --global user.name "maheenfortune26-maker"
```

## Push code to GitHub
```
git init
git add .
git commit -m "Add all 8 React hook projects"
git remote add origin https://github.com/maheenfortune26-maker/react-hooks-project-pack.git
git branch -M main
git push -u origin main
```

## Deploy each project (run inside each folder)

### Project 1
```
cd 01-accordion
npm install
npm run deploy
cd ..
```

### Project 2
```
cd 02-random-color-generator
npm install
npm run deploy
cd ..
```

### Project 3
```
cd 03-star-rating
npm install
npm run deploy
cd ..
```

### Project 4
```
cd 04-image-slider
npm install
npm run deploy
cd ..
```

### Project 5
```
cd 05-load-more-products
npm install
npm run deploy
cd ..
```

### Project 6
```
cd 06-nested-tree-view
npm install
npm run deploy
cd ..
```

### Project 7
```
cd 07-weather-app
npm install
npm run deploy
cd ..
```

### Project 8
```
cd 08-food-recipe-app
npm install
npm run deploy
cd ..
```

## Enable GitHub Pages
Go to your repo on GitHub → Settings → Pages → Branch: gh-pages → Save

## Your live links will be:
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/01-accordion/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/02-random-color-generator/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/03-star-rating/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/04-image-slider/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/05-load-more-products/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/06-nested-tree-view/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/07-weather-app/
- https://maheenfortune26-maker.github.io/react-hooks-project-pack/08-food-recipe-app/
