package com.project.rest.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Priority;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import java.io.IOException;

@Priority(100)
public class ResponseFilter implements ContainerResponseFilter {
    private final static Logger logger = LoggerFactory.getLogger(ResponseFilter.class);
    public ResponseFilter() {}
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext responseContext) throws IOException {
        String origin = requestContext.getHeaderString("origin");
        responseContext.getHeaders().add("Access-Control-Allow-Origin", origin);
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "Content-Type, Accept");
        logger.info("ResponseFilter executed.");
    }
}
