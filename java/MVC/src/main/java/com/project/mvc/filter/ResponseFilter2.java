package com.project.mvc.filter;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.Context;
import java.io.IOException;

@Priority(1001)
public class ResponseFilter2 implements ContainerResponseFilter {

    @Context
    private HttpServletRequest httpServletRequest;
    @Context
    private HttpServletResponse httpServletResponse;
    public ResponseFilter2() {
    }
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) throws IOException {

        String origin = requestContext.getHeaderString("origin");
        responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
    }
}
