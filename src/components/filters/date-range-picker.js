import React from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import {connect} from 'react-redux'
import {updateFilters} from '../../ac'
import 'react-day-picker/lib/style.css'

class Example extends React.Component {
    static defaultProps = {
        numberOfMonths: 2,
    }

    handleDayClick = day => {
        const dates = DateUtils.addDayToRange(day, this.props.dates)
        this.props.onHandleDayClick(dates)
    }

    handleResetClick = () => {
        this.props.onHandleDayClick({from: undefined, to: undefined})
    }

    render() {
        const {from, to} = this.props;
        const modifiers = {start: from, end: to}
        return (
            <div className="RangeExample">
                <p>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                    to &&
                    `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {from &&
                    to && (
                        <button className="link" onClick={this.handleResetClick}>
                            Reset
                        </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
}

const mapStateToProps = store => ({
    from: store.filters.dates.from,
    to: store.filters.dates.to,
    dates: store.filters.dates
})

const mapDispatchToProps = dispatch => ({
    onHandleDayClick: dates => dispatch(updateFilters({dates})),
    onHandleResetClick: dates => dispatch(updateFilters({dates}))
})

export default connect(mapStateToProps, mapDispatchToProps)(Example)