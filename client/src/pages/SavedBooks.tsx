import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Use the GET_ME query to fetch user data
  const { loading, error, data } = useQuery(GET_ME);

  // Extract user data from the query result
  const userData = data?.me || {};

  // Set up the REMOVE_BOOK mutation
  const [removeBookMutation, { loading: removeBookLoading }] = useMutation(REMOVE_BOOK, {
    update(cache, { data: { removeBook } }) {
      cache.writeQuery({
        query: GET_ME,
        data: { me: removeBook },
      });
    }
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeBookMutation({
        variables: { bookId }
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data is still loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // if there was an error with the query
  if (error) {
    return <h2>Error loading your saved books!</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button 
                      className='btn-block btn-danger' 
                      onClick={() => handleDeleteBook(book.bookId)}
                      disabled={removeBookLoading}>
                      {removeBookLoading ? 'Deleting...' : 'Delete this Book!'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;