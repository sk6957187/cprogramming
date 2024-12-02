package com.project.mvc.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import java.util.ArrayList;

/**
 * Created by shishupalkumar on 11/02/17.
 */
@Priority(501)
public class RequestFilter implements ContainerRequestFilter {
    final static private Logger logger = LoggerFactory.getLogger(RequestFilter.class);
    @Context
    private HttpServletRequest httpServletRequest;
    public RequestFilter() {
    }
    public void filter(final ContainerRequestContext requestContext) {
    }
}
