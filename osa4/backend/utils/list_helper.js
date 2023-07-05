
const dummy = (blogs => 1);

const total = (blogs) => {
    const totalValue = 0;
    const sumValues = blogs.reduce(
        (accumulator, blog) => accumulator + blog.likes, totalValue
    );
    return sumValues;
};

const favorite = (blogs,property) => {

    if (blogs.length === 0) {
        return null;
    }

    return blogs.reduce((prev,curr) => {
        return curr[property] > prev[property] ? curr : prev;
    });
}

const blogAmount = (array, author) => {
    let count = 0;
    for (const obj of array) {
      if (obj.author === author) {
        count++;
      }
    }
    return count;
  };

const mostBlogs = (array) => {
    const authorCounts = array.reduce((counts, obj) => {
      const author = obj.author;
      counts[author] = (counts[author] || 0) + 1;
      return counts;
    }, {});
  
    let maxAuthor = null;
    let maxCount = 0;
    for (const author in authorCounts) {
      if (authorCounts[author] > maxCount) {
        maxAuthor = author;
        maxCount = authorCounts[author];
      }
    }
  
    const mostFrequentObject = array.find(obj => obj.author === maxAuthor);
    return {name:mostFrequentObject.author,blogs:blogAmount(array,mostFrequentObject.author)};
  };

const getLikesArray = (array) => {
  /*
  Removes url and title from array,
  adds every like from input array into new one, where name === name
  returns array with author and likes
  */
  const newArray = [];
  const authorSet = new Set();
  array.forEach(item => {
    if (!authorSet.has(item.author)) {
      newArray.push({author: item.author, likes:item.likes});
      authorSet.add(item.author);
    } else {
      const nameToFind = item.author
      const indx = newArray.findIndex(item => item.author === nameToFind);
      newArray[indx].likes += item.likes
    }
  });
  return newArray;
}


const mostLikes = (array) => {
  array = getLikesArray(array)
  maxLikes = {
    author:"",
    likes:0
  }

  array.forEach(item => {
    if (item.likes > maxLikes.likes) {
      maxLikes.author = item.author,
      maxLikes.likes = item.likes
    }
  })

  return maxLikes

}


module.exports = {
  dummy,
  total,
  favorite,
  mostBlogs,
  mostLikes
}