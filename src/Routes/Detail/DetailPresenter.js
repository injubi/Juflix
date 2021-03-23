import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import Message from "Components/Message";

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:url(${props => props.bgImage});
    background-size: cover;
    background-position: center center;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
`;

const Cover = styled.div`
    width: 30%;
    background-image:url(${props => props.bgImage});
    background-size: cover;
    background-position: center center;
    height: 100%;
    border-radius: 5px;
    @media only screen and (max-width: 768px) {
        width: 0%;
    }
`;

const Data = styled.div`
    width: 70%;
    margin-left: 30px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0 10px;
`;

const Overview = styled.p`
    font-size: 12px;
    line-height: 1.5;
    width: 50%;    
`;

const DetailPresenter = ({ result, loading, error }) => (
    loading ? (
        <>
            <Helmet>
                <title>Loading | Juflix</title>
            </Helmet>
            <Loader />
        </>
    ) : (
        error ? <Message /> :
            <Container>
                <Helmet>
                    <title>
                        {result.original_title
                            ? result.original_title
                            : result.original_name} | Juflix
                    </title>
                </Helmet>
                <Backdrop
                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
                <Content>
                    <Cover
                        bgImage={
                            result.poster_path
                                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                                : require("../../assets/noPosterSmall.jpg").default
                        }
                    />
                    <Data>
                        <Title>
                            {result.original_title
                                ? result.original_title
                                : result.original_name}
                        </Title>
                        <ItemContainer>
                            <Item>
                                {result.release_date
                                    ? result.release_date.substring(0, 4)
                                    : result.first_air_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.runtime || result.episode_run_time} min
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres &&
                                    result.genres.map((genre, index) =>
                                        index === result.genres.length - 1
                                            ? genre.name
                                            : `${genre.name} / `
                                    )}
                            </Item>
                            <Divider>•</Divider>
                            {(Math.round(result.vote_average / 2)) === 1 && <Item>★☆☆☆☆</Item>}
                            {(Math.round(result.vote_average / 2)) === 2 && <Item>★★☆☆☆</Item>}
                            {(Math.round(result.vote_average / 2)) === 3 && <Item>★★★☆☆</Item>}
                            {(Math.round(result.vote_average / 2)) === 4 && <Item>★★★★☆</Item>}
                            {(Math.round(result.vote_average / 2)) === 5 && <Item>★★★★★</Item>}
                        </ItemContainer>
                        <Overview>
                            {result.overview}
                        </Overview>
                    </Data>
                </Content>
            </Container>
        )
);

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;