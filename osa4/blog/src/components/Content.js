let testBlogs = [
    {
        name:"test1",
        address: "www.testing.sad",
        votes: 2,
        id:1
    },
    {
        name: "test2",
        address: "www.testin2.sad",
        votes:50,
        id:2
    },
    {
        name: "Really long test name",
        address: "www.really really loasdasdasddasdaasdng addres..com",
        votes:1000,
        id:3
    }
];

const Content = () => {
    console.log(' setting up content');
    return (
        <table className='center'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Votes</th>
              <th>Vote</th>
            </tr>
          </thead>
          <tbody>
            {testBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.name}</td>
                <td>{blog.address}</td>
                <td>{blog.votes}</td>
                <td>
                  <button key={blog.id}>Vote</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};
export default Content;