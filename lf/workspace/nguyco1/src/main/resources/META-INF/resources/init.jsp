<%@page import="com.liferay.portal.kernel.model.Organization"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>

<%@ taglib uri="http://liferay.com/tld/aui" prefix="aui" %><%@
taglib uri="http://liferay.com/tld/portlet" prefix="liferay-portlet" %><%@
taglib uri="http://liferay.com/tld/theme" prefix="liferay-theme" %><%@
taglib uri="http://liferay.com/tld/ui" prefix="liferay-ui" %>

<liferay-theme:defineObjects />

<portlet:defineObjects />
<%
Organization org  = null;

if(user.getOrganizations() != null && user.getOrganizations().size()>0){
	org = user.getOrganizations().get(0);
}
String DONVIHANHCHINH = "";
if(org != null){
	DONVIHANHCHINH = (String)org.getExpandoBridge().getAttribute("DONVIHANHCHINH");
}
%>

<script type="text/javascript">
 var DONVIHANHCHINH="<%=DONVIHANHCHINH%>";
</script>