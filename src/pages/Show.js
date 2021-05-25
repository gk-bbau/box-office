/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useParams } from 'react-router-dom';
import ShowMainData from '../components/show/ShowMainData';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import Cast from '../components/show/Cast';
import { InfoBlock, ShowPageWrapper } from './Show.styled';
import { useShow } from '../misc/custom-hooks';

const Show = () => {
  const { id } = useParams();
  const { show, isLoading, error } = useShow(id);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Error occured: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />

      <InfoBlock>
        <h2>
          Details
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premiered}
          />
        </h2>
      </InfoBlock>

      <InfoBlock>
        <h2>
          Seasons
          <Seasons seasons={show._embedded.seasons} />
        </h2>
      </InfoBlock>

      <InfoBlock>
        <h2>
          Cast
          <Cast cast={show._embedded.cast} />
        </h2>
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
