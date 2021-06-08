import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi, tvApi } from '../../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push('/');
    }
    let result = null;
    try {
      if (isMovie) {
        // 이렇게 하면 위의 result가 아닌 다른 result 변수 생성
        // const { data: result } = await moviesApi.showDetail(parsedId);
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        // 이렇게 하면 위의 result가 아닌 다른 result 변수 생성
        // const { data: result } = await tvApi.showDetail(parsedId);
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
