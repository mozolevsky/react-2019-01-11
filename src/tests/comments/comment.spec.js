import React from 'react'
import {mount} from 'enzyme'
import mockedArticles from '../../fixtures'
import CommentList from '../../components/comments/comment-list'

describe('Comment List', () => {
    it('should render', () => {
        const wrapper = mount(
            <CommentList comments={mockedArticles[0].comments} />
        )
        wrapper.setState({isOpen: true})
        expect(wrapper.exists()).toBe(true)
    })

    it('is opend', () => {
        const wrapper = mount(
            <CommentList comments={mockedArticles[0].comments}/>
        )
        wrapper.setState({isOpen: true})
        expect(wrapper.find('ul').length).toBe(1)
    })

    it('is closed', () => {
        const wrapper = mount(
            <CommentList comments={mockedArticles[0].comments} />
        )
        wrapper.setState({isOpen: false})
        expect(wrapper.find('ul').length).toBe(0)
    })

    it('gets an empty comments list', () => {
        const wrapper = mount(
            <CommentList comments={[]} />
        )
        wrapper.setState({isOpen: true})
        expect(wrapper.text()).toMatch(/No comments yet/)
    })
})
