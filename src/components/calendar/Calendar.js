import React from 'react';
import InfiniteCalendar, {
  Calendar,
  defaultMultipleDateInterpolation,
  withMultipleDates,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';

const MultipleDatesCalendar = withMultipleDates(Calendar);

class CustomCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        isSelected : false, 
        date : new Date()
        }
    }

    render() {
    console.log("CalendarPropsDateSelected", this.props.dateSelected)

        return (
        <InfiniteCalendar 
            Component={MultipleDatesCalendar}
            interpolateSelection={defaultMultipleDateInterpolation}
            // selected={this.props.locals}
            selected={this.props.dateSelected}
            // onSelect={this.state.date}  
        />
        );
    }
}
export default CustomCalendar;