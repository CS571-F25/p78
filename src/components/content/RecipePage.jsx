import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext.jsx';
import { Container, Row, Col, Card, Button, Badge, ListGroup, Image } from 'react-bootstrap';

export const RecipePage = () => {
    const { id } = useParams();
    const { recipes, loading, toggleFavorite, isFavorite } = useContext(RecipeContext);

    if (loading) return <div className="p-4">Loading...</div>;

    const recipe = (recipes || []).find(r => String(r._id) === String(id));

    if (!recipe) {
        return (
            <Container className="py-4">
                <h3>Recipe not found</h3>
                <Link to="/">Back to home</Link>
            </Container>
        );
    }

    const favorited = isFavorite ? isFavorite(recipe._id) : false;

    const handleToggleFav = () => {
        if (toggleFavorite) toggleFavorite(recipe._id);
    };

    return (
        <Container className="py-4">
            <div>
                <Link to="/">← Back</Link>
            </div>

            <Row className="mt-2">
                <Col>
                    <h2 className="mb-1">{recipe.name}</h2>
                    <div className="d-flex align-items-center gap-2 mb-3">
                        {recipe.category && <Badge bg="secondary">{recipe.category}</Badge>}
                        {recipe.area && <Badge bg="info" text="dark">{recipe.area}</Badge>}
                        {recipe.tags && recipe.tags.map((t, i) => (
                            <Badge bg="warning" text="dark" key={i}>{t}</Badge>
                        ))}
                    </div>

                    <div className="mb-3">
                        <Button variant={favorited ? 'warning' : 'outline-warning'} onClick={handleToggleFav}>
                            {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="g-4">
                <Col md={5}>
                    <Card className="">
                        {recipe.thumbnail && (
                            <Card.Img as={Image} src={recipe.thumbnail} alt={recipe.name} fluid />
                        )}
                    </Card>
                </Col>

                <Col md={7}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Ingredients</Card.Title>
                            <ListGroup variant="flush">
                                {(recipe.ingredients || []).map((ing, idx) => (
                                    <ListGroup.Item key={idx} className="d-flex justify-content-between">
                                        <span>{ing[0]}</span>
                                        <small className="text-muted">{ing[1]}</small>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>

                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Instructions</Card.Title>
                            <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{recipe.instructions}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RecipePage;
