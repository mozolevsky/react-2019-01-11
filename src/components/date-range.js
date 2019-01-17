import React, {Component, Fragment} from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

class DateRange extends Component {
    state = {
        startDate: null,
        endDate: null
    }

    handleChangeStart = date => {
        this.setState(prevState => ({
            ...prevState,
            startDate: date
        }))
    }

    handleChangeEnd = date => {
        this.setState(prevState => ({
            ...prevState,
            endDate: date
        }))
    }

    render() {
        const {startDate, endDate} = this.state
        return (
            <Fragment>
                <DatePicker
                    selected={startDate}
                    selectsStart={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={this.handleChangeStart}
                />
                <DatePicker
                    selected={endDate}
                    selectsEnd={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={this.handleChangeEnd}
                />
                <section>
                    <p>Start date: {startDate && startDate.toLocaleDateString("en-US")}</p>
                    <p>End date: {endDate && endDate.toLocaleDateString("en-US")}</p>
                </section>
            </Fragment>
        )
    }
}

export default DateRange