import React from "react";
import Api from "../../utils/Api";
import { Spinner } from "react-activity";
import * as moment from "moment";


class SharedInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      shareId: {}
    };
  }

  componentDidMount() {
    const { id } = this.props;
    Api.getShareid(id).then(shareId => {
      return (
        console.log("shareId", shareId),
        this.setState({
          isLoading: true,
          shareId
        })
      );
    });
  }

  render() {
    const { shareId, isLoading } = this.state;
    if (shareId === 0) {
      return (
        <Spinner
          className="spinner"
          color="#191102"
          size={30}
          speed={1}
          animating={true}
        />
      );
    }
    if (!isLoading) {
      return (
        <Spinner
          className="spinner"
          color="#191102"
          size={30}
          speed={1}
          animating={true}
        />
      );
    }
    return (
      <tr>
        <td>{`${shareId.user.firstName} ${shareId.user.lastName}`}</td>
        <td>{shareId.event.name}</td>
        <td>{moment(shareId.created).format("DD/MM/YYYY HH:mm")}</td>
      </tr>
    );
  }
}
export default SharedInfo;
