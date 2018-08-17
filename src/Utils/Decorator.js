import React from 'react'
import Log from '../Library/Logger'
import { ErrorBoundary } from '../components/ErrorBoundary'


/**
 * 不可修改
 * @param {Object} target
 * @param {string} name
 * @param {object.descriptor} descriptor
 */
export function readonly(target, name, descriptor) {
    descriptor.writable = false
    return descriptor
}

/**
 * 不可枚举
 * @param {Object} target
 * @param {string} name
 * @param {object.descriptor} descriptor
 */
export function unenumerable(target, name, descriptor) {
    descriptor.enumerable = false
    return descriptor
}

/**
 * 公共日志方法注入
 * @param {string} name
 * @param {Boolean} isPreserveLog
 * @param {Object} config
 */
export function Logger(name, isPreserveLog, config) {
    return function(component) {
        component.prototype.Logger = new Log(
            name,
            isPreserveLog,
            config ? config : {}
        )

        // 判断component是否为react组件
        const unmount = component.prototype.componentWillUnmount;
        if(unmount){
            component.prototype.componentWillUnmount = function (){
                unmount.call(this)
                this.Logger && this.Logger.destory()
                this.Logger = null
            }
        }
        
    }
}

/**
 * 添加onRef方法获取组件
 * @param {Component} WrappedComponent
 */
export function onRef(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.WrappedComponent = React.createRef()
        }
        componentDidMount() {
            this.props.onRef && this.props.onRef(this.WrappedComponent.current)
        }
        render() {
            return (
                <WrappedComponent ref={this.WrappedComponent} {...this.props} />
            )
        }
    }
}

/**
 * 错误边界处理
 * @param {Component} WrappedComponent
 */
export function errorBoundary(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <ErrorBoundary>
                    <WrappedComponent {...this.props} />
                </ErrorBoundary>
            )
        }
    }
}
