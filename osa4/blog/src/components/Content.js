
const Content = ({blogs,handleLikes}) => {
    console.log(' setting up content');
    return (
        <table className='center'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>url</th>
              <th>Votes</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.url}</td>
                <td>{blog.likes}</td>
                <td>
                  <button button_id={blog.id} onClick={() => handleLikes(blog.id,{likes:1})}>Vote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};
export default Content;