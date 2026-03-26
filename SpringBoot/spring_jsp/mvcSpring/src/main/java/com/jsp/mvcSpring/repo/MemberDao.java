package com.jsp.mvcSpring.repo;

import java.util.List;

import com.jsp.mvcSpring.domain.Member;

public interface MemberDao
{
    public Member findById(Long id);

    public Member findByEmail(String email);

    public List<Member> findAllOrderedByName();

    public void register(Member member);
}
